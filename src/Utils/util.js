export default {
    getDOMRect(str, callback) {
        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.visibility = 'hidden';
        div.innerHTML = str;
        document.body.appendChild(div);
        const rect = div.getBoundingClientRect();
        // document.body.removeChild(div);
        return rect;
    },

    getSVGBBox(){

    }
}