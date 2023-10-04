const data = {
    item: "data",
    obj: {
        fn: function () {
            (() => {
                console.log(this);
            })()
        }
    }
}
var item = '1'
data.obj.fn();