import './index-86ac49ff.js';
import './ionic-global-0f98fe97.js';
import { q as WebPlugin } from './conftoken-38d23b50.js';
import './jquery-5df58adb.js';
import './utils-16079bfd.js';
import './helpers-719f4c54.js';
import './animation-10ea33c3.js';
import './index-7173f7a2.js';
import './ios.transition-95375ac9.js';
import './md.transition-6d74e584.js';
import './cubic-bezier-93f47170.js';
import './index-7fe827c3.js';
import './index-b40d441b.js';
import './hardware-back-button-aacf3d12.js';
import './index-50651ccc.js';
import './overlays-5302658e.js';

class LocalNotificationsWeb extends WebPlugin {
    constructor() {
        super(...arguments);
        this.pending = [];
        this.deliveredNotifications = [];
        this.hasNotificationSupport = () => {
            if (!('Notification' in window) || !Notification.requestPermission) {
                return false;
            }
            if (Notification.permission !== 'granted') {
                // don't test for `new Notification` if permission has already been granted
                // otherwise this sends a real notification on supported browsers
                try {
                    new Notification('');
                }
                catch (e) {
                    if (e.name == 'TypeError') {
                        return false;
                    }
                }
            }
            return true;
        };
    }
    async getDeliveredNotifications() {
        const deliveredSchemas = [];
        for (const notification of this.deliveredNotifications) {
            const deliveredSchema = {
                title: notification.title,
                id: parseInt(notification.tag),
                body: notification.body,
            };
            deliveredSchemas.push(deliveredSchema);
        }
        return {
            notifications: deliveredSchemas,
        };
    }
    async removeDeliveredNotifications(delivered) {
        for (const toRemove of delivered.notifications) {
            const found = this.deliveredNotifications.find(n => n.tag === String(toRemove.id));
            found === null || found === void 0 ? void 0 : found.close();
            this.deliveredNotifications = this.deliveredNotifications.filter(() => !found);
        }
    }
    async removeAllDeliveredNotifications() {
        for (const notification of this.deliveredNotifications) {
            notification.close();
        }
        this.deliveredNotifications = [];
    }
    async createChannel() {
        throw this.unimplemented('Not implemented on web.');
    }
    async deleteChannel() {
        throw this.unimplemented('Not implemented on web.');
    }
    async listChannels() {
        throw this.unimplemented('Not implemented on web.');
    }
    async schedule(options) {
        if (!this.hasNotificationSupport()) {
            throw this.unavailable('Notifications not supported in this browser.');
        }
        for (const notification of options.notifications) {
            this.sendNotification(notification);
        }
        return {
            notifications: options.notifications.map(notification => ({
                id: notification.id,
            })),
        };
    }
    async getPending() {
        return {
            notifications: this.pending,
        };
    }
    async registerActionTypes() {
        throw this.unimplemented('Not implemented on web.');
    }
    async cancel(pending) {
        this.pending = this.pending.filter(notification => !pending.notifications.find(n => n.id === notification.id));
    }
    async areEnabled() {
        const { display } = await this.checkPermissions();
        return {
            value: display === 'granted',
        };
    }
    async requestPermissions() {
        if (!this.hasNotificationSupport()) {
            throw this.unavailable('Notifications not supported in this browser.');
        }
        const display = this.transformNotificationPermission(await Notification.requestPermission());
        return { display };
    }
    async checkPermissions() {
        if (!this.hasNotificationSupport()) {
            throw this.unavailable('Notifications not supported in this browser.');
        }
        const display = this.transformNotificationPermission(Notification.permission);
        return { display };
    }
    transformNotificationPermission(permission) {
        switch (permission) {
            case 'granted':
                return 'granted';
            case 'denied':
                return 'denied';
            default:
                return 'prompt';
        }
    }
    sendPending() {
        var _a;
        const toRemove = [];
        const now = new Date().getTime();
        for (const notification of this.pending) {
            if (((_a = notification.schedule) === null || _a === void 0 ? void 0 : _a.at) &&
                notification.schedule.at.getTime() <= now) {
                this.buildNotification(notification);
                toRemove.push(notification);
            }
        }
        this.pending = this.pending.filter(notification => !toRemove.find(n => n === notification));
    }
    sendNotification(notification) {
        var _a;
        if ((_a = notification.schedule) === null || _a === void 0 ? void 0 : _a.at) {
            const diff = notification.schedule.at.getTime() - new Date().getTime();
            this.pending.push(notification);
            setTimeout(() => {
                this.sendPending();
            }, diff);
            return;
        }
        this.buildNotification(notification);
    }
    buildNotification(notification) {
        const localNotification = new Notification(notification.title, {
            body: notification.body,
            tag: String(notification.id),
        });
        localNotification.addEventListener('click', this.onClick.bind(this, notification), false);
        localNotification.addEventListener('show', this.onShow.bind(this, notification), false);
        localNotification.addEventListener('close', () => {
            this.deliveredNotifications = this.deliveredNotifications.filter(() => !this);
        }, false);
        this.deliveredNotifications.push(localNotification);
        return localNotification;
    }
    onClick(notification) {
        const data = {
            actionId: 'tap',
            notification,
        };
        this.notifyListeners('localNotificationActionPerformed', data);
    }
    onShow(notification) {
        this.notifyListeners('localNotificationReceived', notification);
    }
}

export { LocalNotificationsWeb };
