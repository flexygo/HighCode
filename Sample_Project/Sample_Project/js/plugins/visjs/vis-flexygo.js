/**
 * Handle updates of an item on double tap
 * @param {vis.Item}  item   The item
 * @private
 */
vis.timeline.components.ItemSet.prototype._onUpdateItem = function (item) {
    if (!this.options.selectable) return;
    /************Override*************/
    /******Old*******/
    /*if (!this.options.editable.add) return;*/
    /******Old******/
    /******New*******/
    if (!this.options.editable.updateGroup && !this.options.editable.updateTime) return;
    /******New*******/

    var me = this;

    if (item) {
        // execute async handler to update the item (or cancel it)
        var itemData = me.itemsData.get(item.id); // get a clone of the data from the dataset
        this.options.onUpdate(itemData, function (itemData) {
            if (itemData) {
                me.itemsData.getDataSet().update(itemData);
            }
        });
    }
};