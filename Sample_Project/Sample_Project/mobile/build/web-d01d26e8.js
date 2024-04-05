import { y as WebPlugin } from './conftoken-2c86328f.js';
import './process-es6-d973fab3.js';
import './jquery-eec92bf9.js';
import './_commonjsHelpers-148b4233.js';
import './utils-0a0c7da4.js';
import './index-d0d1673d.js';
import './animation-10ea33c3.js';
import './helpers-719f4c54.js';
import './ios.transition-62fdffc9.js';
import './index-06bb8825.js';
import './md.transition-f61d2286.js';
import './cubic-bezier-93f47170.js';
import './index-7fe827c3.js';
import './ionic-global-f9661584.js';
import './index-b40d441b.js';
import './index-07c2bb76.js';
import './hardware-back-button-aacf3d12.js';
import './overlays-177438ad.js';

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
