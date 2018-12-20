
/* Module Releal Pattern with auto call, and private */
(function(win, doc, $){

var chatModule = (function(){
    var     leadself = 'Me: ',
    leadcomputer = 'PC: ',
    aSaid = ['This is a Cyber Chat'],
    msgYes = 'yes, that a great idea.',
    msgNo = 'No,that must be a mistake',
    aSasiStuff = ['Like mold on books, grow myths on history.',
    'She moved like a poem and smiled like a sphinx.','As long as we dont die, this gonna be one hell of a story.',
    'She lough, and the desert sang.', 'youve got about as much charm as a dead slug.'
    ];
    function echo (msg){
        aSaid.push("<div>" + msg + "</div>");
        var aSaidLength = aSaid.length;
            console.log(aSaidLength);
            start = Math.max( aSaidLength - 6,0);
            console.log(start);
    
        var out = "";
    
        for(i = start; i < aSaidLength; i++){
            out += aSaid[i];
            console.log(aSaid)
            console.log(i);
            console.log(out);
    
        }
    
        $('.advert').html(out);
        $('#talk span').text(msg);
    }

    function talk(msg){
        echo(leadself + msg);
    
    }

    function replayYesNo(){
        var msg = Math.random()>.5 ? msgYes : msgNo;
        echo(leadcomputer + msg);
    
    }

    function saySassyStuff(){
        msg = aSasiStuff[Math.floor(Math.random() * aSasiStuff.length)],
        
        echo(leadcomputer + msg);
    }

    

    return {
        talk : talk,

        replayYesNo: replayYesNo,
    
        saySassyStuff: saySassyStuff,

    }
})();

if(!win.chatModule) win.chatModule = chatModule;

$(doc).ready(function(){
    // chatModule.talk('this is great');
    // chatModule.replayYesNo();
    // chatModule.saySassyStuff();
});


})(window, document, jQuery);

/* Singleton */

/*
(function(win, $){
    var CircleGeneratorSingleton = (function(){
         var instance;

         function init(){
            var _aCircle = [],
                _stage = $('.advert');

            function _position(circle, left, top){
                circle.css('left', left);
                circle.css('top', top);
    
            }    
            function create(left, top){
                var circle = $('<div class="circle"></div>');
                _position(circle, left, top);
                return circle;
            }

            function add(circle){
                _stage.append(circle);
                _aCircle.push(circle);
            }   

            function index(){
                _aCircle.length;
            }
            return {
                index: index,
                create: create,
                add:add 

            };
         }

         return {
             getInstance: function(){

                 if(!instance){
                     instance = init();
                 }

                 return instance;
             }
         }
    })();

    $(win.document).ready(function(){
         $('.advert').click(function(e){
            var cg = CircleGeneratorSingleton.getInstance();
            var circle = cg.create(e.pageX-25, e.pageY-25);

            cg.add(circle);
        });

        $(document).keypress(function(e){
            if(e.key == 'a'){
                var cg = CircleGeneratorSingleton.getInstance();
                var circle = cg.create(Math.floor(Math.random()*600),
                Math.floor(Math.random()*600)
                )
                cg.add(circle);
            }
        }) 
    });

})(window, jQuery);

*/

/* Factory Design Pattern */

/* 
(function(win, $){

    var RedCircle = function(){
        this.item = $('<div class="circle"></div>'); 
    }
    var BlueCircle = function(){
        this.item = $('<div class="circle" style="background:blue"></div>')
    }
    var CircleFactory = function(){

        this.create = function(color){
            if (color === "blue"){
                return new BlueCircle();
            } else{
                return new RedCircle();
            }
        }
    }

    var CircleGeneratorSingleton = (function(){
         var instance;

         function init(){
            var _aCircle = [],
                _stage = $('.advert'),
                _cf = new CircleFactory();

            function _position(circle, left, top){
                circle.css('left', left);
                circle.css('top', top);
    
            }    
            function create(left, top, color){
                var circle = _cf.create(color).item;
                _position(circle, left, top);
                return circle;
            }

            function add(circle){
                _stage.append(circle);
                _aCircle.push(circle);
            }   

            function index(){
                _aCircle.length;
            }
            return {
                index: index,
                create: create,
                add:add 

            };
         }

         return {
             getInstance: function(){

                 if(!instance){
                     instance = init();
                 }

                 return instance;
             }
         }
    })();

    $(win.document).ready(function(){
       $('.advert').click(function(e){
            var cg = CircleGeneratorSingleton.getInstance();
            var circle = cg.create(e.pageX-25, e.pageY-25, "red");

            cg.add(circle);
        });

        $(document).keypress(function(e){
            if(e.key == 'a'){
                var cg = CircleGeneratorSingleton.getInstance();
                var circle = cg.create(Math.floor(Math.random()*600),
                Math.floor(Math.random()*600),"blue")
                cg.add(circle);
            }
        }) 
    });

})(window, jQuery);
*/

/* Abstract Factory Design Pattern */
/*

(function(win, $){

    function RedCircle(){
        
    }

    RedCircle.prototype.create = function(){
        this.item = this.item = $('<div class="circle"></div>'); 
        return this;
    }
    function BlueCircle(){
        
    }

    BlueCircle.prototype.create = function(){
        this.item = $('<div class="circle" style="background:blue"></div>');
        return this;
    }
    var CircleFactory = function(){
        this.type = {};
        this.create = function(type){
            
            return new this.type[type]().create();

        }
        this.register = function(type, cls){
            if(cls.prototype.create){
                this.type[type] = cls;
            }
        }
    }

    var CircleGeneratorSingleton = (function(){
         var instance;

         function init(){
            var _aCircle = [],
                _stage = $('.advert'),
                _cf = new CircleFactory();
                _cf.register('red', RedCircle);
                _cf.register('blue', BlueCircle);
                

            function _position(circle, left, top){
                circle.css('left', left);
                circle.css('top', top);
    
            }    
            function create(left, top, type){
                var circle = _cf.create(type).item;
                _position(circle, left, top);
                return circle;
            }

            function add(circle){
                _stage.append(circle);
                _aCircle.push(circle);
            }   

            function index(){
                _aCircle.length;
            }
            return {
                index: index,
                create: create,
                add:add 

            };
         }

         return {
             getInstance: function(){

                 if(!instance){
                     instance = init();
                 }

                 return instance;
             }
         }
    })();

    $(win.document).ready(function(){
      /*  $('.advert').click(function(e){
            var cg = CircleGeneratorSingleton.getInstance();
            var circle = cg.create(e.pageX-25, e.pageY-25, "red");

            cg.add(circle);
        });

        $(document).keypress(function(e){
            if(e.key == 'a'){
                var cg = CircleGeneratorSingleton.getInstance();
                var circle = cg.create(Math.floor(Math.random()*600),
                Math.floor(Math.random()*600),"blue")
                cg.add(circle);
            }
        }) 
    });

})(window, jQuery);

 */

/* Builder Design Pattern */

/* (function(win, $){

    function Circle(){
        this.item = $('<div class="circle"></div>');

    }

    Circle.prototype.color = function(clr){
        this.item.css('background', clr);

    }

    Circle.prototype.move = function(left, top){
        this.item.css('left', left);
        this.item.css('top', top);

    } 
    Circle.prototype.get = function(){
        return this.item;
    }

    function RedCircleBuilder(){
        this.item = new Circle();
        this.init();

    }

    RedCircleBuilder.prototype.init = function(){
        
    }

    RedCircleBuilder.prototype.get = function(){
        return this.item;
    }

    function BlueCircleBuilder(){
        this.item = new Circle();
        this.init();

    }

    BlueCircleBuilder.prototype.init = function(){
        this.item.color('blue');

    }

    BlueCircleBuilder.prototype.get = function(){
        return this.item;
    }

    var CircleFactory = function(){
        this.type = {};
        this.create = function(type){
            
            return new this.type[type]().get();

        }
        this.register = function(type, cls){
            if(cls.prototype.init && cls.prototype.get){
                this.type[type] = cls;
            }
        }
    }

    var CircleGeneratorSingleton = (function(){

         var instance;

         function init(){
            var _aCircle = [],
                _stage = $('.advert'),
                _cf = new CircleFactory();
                _cf.register('red', RedCircleBuilder);
                _cf.register('blue', BlueCircleBuilder);
                

            function _position(circle, left, top){
                circle.move(left, top);
    
            }    
            function create(left, top, type){
                var circle = _cf.create(type);
                circle.move(left, top);
           
                return circle;
            }

            function add(circle){
                _stage.append(circle.get());
                _aCircle.push(circle.get());
            }   

            function index(){
                _aCircle.length;
            }
            return {
                index: index,
                create: create,
                add:add 

            };
         }

         return {
             getInstance: function(){

                 if(!instance){
                     instance = init();
                 }

                 return instance;
             }
         }
    })();

    $(win.document).ready(function(){
       $('.advert').click(function(e){
            var cg = CircleGeneratorSingleton.getInstance();
            var circle = cg.create(e.pageX-25, e.pageY-25, "red");

            cg.add(circle);
        });

        $(document).keypress(function(e){
            if(e.key == 'a'){
                var cg = CircleGeneratorSingleton.getInstance();
                var circle = cg.create(Math.floor(Math.random()*600),
                Math.floor(Math.random()*600),"blue")
                cg.add(circle);
            }
        }) 
    });

})(window, jQuery); */


/* Prototype Pattern */

/* (function(win, $){

    function clone(src, out){
        for(var attr in src.prototype){
            out.prototype[attr] = src.prototype[attr];
        }
    }

    function Rect(){
        this.item = $('<div class="rect"></div>');
    }

   

    function Circle(){
        this.item = $('<div class="circle"></div>');

    }

    

    Circle.prototype.color = function(clr){
        this.item.css('background', clr);

    }

    Circle.prototype.move = function(left, top){
        this.item.css('left', left);
        this.item.css('top', top);

    } 
    Circle.prototype.get = function(){
        return this.item;
    }

    clone(Circle, Rect);

    function RedCircleBuilder(){
        this.item = new Circle();
        this.init();

    }

    RedCircleBuilder.prototype.init = function(){
        
    }

    RedCircleBuilder.prototype.get = function(){
        return this.item;
    }

    function BlueCircleBuilder(){
        this.item = new Circle();
        this.init();



    }

    BlueCircleBuilder.prototype.init = function(){
        this.item.color('blue');

        var rect = new Rect();
        rect.color("yellow");
        rect.move(40,40);

        this.item.get().append(rect.get());

    }

    BlueCircleBuilder.prototype.get = function(){
        return this.item;
    }

    var CircleFactory = function(){
        this.type = {};
        this.create = function(type){
            
            return new this.type[type]().get();

        }
        this.register = function(type, cls){
            if(cls.prototype.init && cls.prototype.get){
                this.type[type] = cls;
            }
        }
    }

    var CircleGeneratorSingleton = (function(){

         var instance;

         function init(){
            var _aCircle = [],
                _stage = $('.advert'),
                _cf = new CircleFactory();
                _cf.register('red', RedCircleBuilder);
                _cf.register('blue', BlueCircleBuilder);
                

            function _position(circle, left, top){
                circle.move(left, top);
    
            }    
            function create(left, top, type){
                var circle = _cf.create(type);
                circle.move(left, top);
           
                return circle;
            }

            function add(circle){
                _stage.append(circle.get());
                _aCircle.push(circle.get());
            }   

            function index(){
                _aCircle.length;
            }
            return {
                index: index,
                create: create,
                add:add 

            };
         }

         return {
             getInstance: function(){

                 if(!instance){
                     instance = init();
                 }

                 return instance;
             }
         }
    })();

    $(win.document).ready(function(){
       $('.advert').click(function(e){
            var cg = CircleGeneratorSingleton.getInstance();
            var circle = cg.create(e.pageX-25, e.pageY-25, "red");

            cg.add(circle);
        });

        $(document).keypress(function(e){
            if(e.key == 'a'){
                var cg = CircleGeneratorSingleton.getInstance();
                var circle = cg.create(Math.floor(Math.random()*600),
                Math.floor(Math.random()*600),"blue")
                cg.add(circle);
            }
        }) 
    });

})(window, jQuery); */

/* Abscracting Singleton */

(function(win, $){

    function clone(src, out){
        for(var attr in src.prototype){
            out.prototype[attr] = src.prototype[attr];
        }
    }

    function Rect(){
        this.item = $('<div class="rect"></div>');
    }

   

    function Circle(){
        this.item = $('<div class="circle"></div>');

    }

    

    Circle.prototype.color = function(clr){
        this.item.css('background', clr);

    }

    Circle.prototype.move = function(left, top){
        this.item.css('left', left);
        this.item.css('top', top);

    } 
    Circle.prototype.get = function(){
        return this.item;
    }

    clone(Circle, Rect);

    function RedCircleBuilder(){
        this.item = new Circle();
        this.init();

    }

    RedCircleBuilder.prototype.init = function(){
        
    }

    RedCircleBuilder.prototype.get = function(){
        return this.item;
    }

    function BlueCircleBuilder(){
        this.item = new Circle();
        this.init();



    }

    BlueCircleBuilder.prototype.init = function(){
        this.item.color('blue');

        var rect = new Rect();
        rect.color("yellow");
        rect.move(40,40);

        this.item.get().append(rect.get());

    }

    BlueCircleBuilder.prototype.get = function(){
        return this.item;
    }

    var ShapeFactory = function(){
        this.type = {};
        this.create = function(type){
            
            return new this.type[type]().get();

        }
        this.register = function(type, cls){
            if(cls.prototype.init && cls.prototype.get){
                this.type[type] = cls;
            }
        }
    }

    var CircleGeneratorSingleton = (function(){

         var instance;

         function init(){
            var _aCircle = [],
                _stage = $('.advert'),
                _sf = new ShapeFactory();
               

            function _position(circle, left, top){
                circle.move(left, top);
    
            }    
            function registerShape(name, cls){
                _sf.register(name, cls);
            }
            function create(left, top, type){
                var circle = _sf.create(type);
                circle.move(left, top);
           
                return circle;
            }

            function add(circle){
                _stage.append(circle.get());
                _aCircle.push(circle.get());
            }   

            function index(){
                _aCircle.length;
            }
            return {
                index: index,
                create: create,
                add:add,
                register: registerShape
            };
         }

         return {
             getInstance: function(){

                 if(!instance){
                     instance = init();
                 }

                 return instance;
             },
         }
    })();

    $(win.document).ready(function(){

        var cg = CircleGeneratorSingleton.getInstance();
        cg.register("blue", BlueCircleBuilder);


        cg.register("red", RedCircleBuilder);

       $('.advert').click(function(e){
            var circle = cg.create(e.pageX-25, e.pageY-25, "red");
            cg.add(circle);
        });

        $(document).keypress(function(e){
            if(e.key == 'a'){
                var circle = cg.create(Math.floor(Math.random()*600),
                Math.floor(Math.random()*600),"blue")
                cg.add(circle);
            }
        }) 
    });

})(window, jQuery);



