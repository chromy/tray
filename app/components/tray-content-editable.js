import Ember from 'ember';
import ContentEditable from './content-editable';

export default ContentEditable.extend({
    keyPress(event) {
        const keyCode = event.which;
        if (keyCode === 13) {
            event.preventDefault();
        }
        return this._super();
    },
});
