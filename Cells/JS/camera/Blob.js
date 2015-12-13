function Blob(id, min, max, mass) {
    "use strict";
    
    this.id = id;
    this.min = min;
    this.max = max;
    this.mass = mass;
    
    this.center = v2(min.x * 0.5 + max.x * 0.5, min.y * 0.5 + max.y * 0.5);
    this.lastDir = v2();
    
    this.live = 0;
    this.maxLive = 20;
}

Blob.prototype = {
    move:function(min, max, mass) {
        this.min = min;
        this.max = max;
        this.mass = mass;
        
        var newCenter = v2(min.x * 0.5 + max.x * 0.5, min.y * 0.5 + max.y * 0.5);
        this.lastDir = v2(newCenter.x - this.center.x, newCenter.y - this.center.y);
        this.center = newCenter.clone();
        
        this.live = 0;
    },
    getCenter: function(){
        this.live++;
        if(this.live > this.maxLive)
            return null;
        return this.center;
    }
}