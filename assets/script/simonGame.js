var Global = require("Global");
var Colors = require("Colors");
// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        tilePre:{
            default:null,
            type:cc.Prefab
        },

        count:{
            default:0,
            type:Number
        },
        bg:{
            default: null,
            type:cc.Node
        },
        tileBg:{
            default:null,
            type:cc.Node
        },
        powerBarBg:{
            default:null,
            type:cc.Node
        },
    },
    
 

    onLoad: function () {
        // 播放背景音乐

        // 初始化方块数组
        Global.tiles = [
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null]
        ];

        //初始化索引
        Global.imgs = [
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null]
        ];


        for(var x=0;x<5;x++){
            for(var y=0;y<5;y++){
                this.count +=1;

                
                if(x==4 && y==4){ 
                   
                    Global.imgs[x][y] ={'myindex':0};
                     break;
                }
                Global.imgs[x][y] ={'myindex':this.count};
                // 把图片生成写到系统，最后一个，空白。。
                var   tile = Global.tiles[x][y] = cc.instantiate(this.tilePre);
                console.log(tile)
                tile.width = (this.tileBg.width-30)/5;
                tile.height = (this.tileBg.height-30)/5;
                var position = cc.v2(5+(5+tile.width)*y+tile.width/2,5+(5+tile.height)*x+tile.height/2);
                // tile.setPosition();
                tile.setPosition(position);
                this.tileBg.addChild(tile);
                tile.getComponent("Tile").myindex= {'x':x,'y':y};
                tile.getComponent("Tile").isBlack= 1;
                // console.log('this.imgs')
                // console.log(this.imgs)
     
                if(x==1 && y==1){

                    cc.loader.loadRes("images/yun", cc.SpriteFrame, function (err, spriteFrame) {
                        console.log(Global.tiles[1][1])
                        Global.tiles[1][1].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    }); 
                }
                if(x==2 && y==2){
                    var that = tile;
                    cc.loader.loadRes("images/yun", cc.SpriteFrame, function (err, spriteFrame) {

                        that.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                }


            }
        }

        this.bg.width = cc.winSize.width;
        this.bg.height = cc.winSize.height;
        this.bg.setPosition(-cc.winSize.width/2,-cc.winSize.height/2);
        // this.bg.color = Colors.gameBg;
        // 方块背景层
/*        this.tileBg.width = cc.winSize.width-30;
        this.tileBg.height = this.tileBg.width;
        this.tileBg.setPosition(15-cc.winSize.width/2,this.powerBarBg.y-10-this.tileBg.height);
        this.tileBg.color = Colors.tileBg;*/

        // 计算生成方块数字的概率
        var gailv = new Array(); 
        this.maxNum = 8;
        for(var num = 0;num<this.maxNum-3;num++){
            gailv[num] = this.maxNum-3-num;
        }
        var sum = 0;
        for(var num = 0;num<gailv.length;num++){
            sum += gailv[num];
        }

        /*// 生成初始方块
        for(var row=0;row<5;row++){
            for(var col = 0;col<5;col++){
                var tile = cc.instantiate(this.tilePre);
                tile.getComponent("Tile").game = this;
                tile.width = (this.tileBg.width-30)/5;
                tile.height = (this.tileBg.height-30)/5;
                var count = 0;
                // var maxRandom = 8;
                var randomNum = 0;
                while(true){
                    count++;
                    var arr = new Array();
                    var scanArr = new Array();
                    // if(count>10){
                    //     maxRandom++;
                    // }
                    // randomNum = Math.ceil(Math.random()*maxRandom);
                    randomNum = Math.random()*sum;
                    var newNum = 0;
                    var min = 0;
                    for(var num = 0;num<gailv.length;num++){
                        if(randomNum>=min&&randomNum<=min+gailv[num]){
                            newNum = num+1;
                            break;
                        }else{
                            min = min + gailv[num];
                        }
                    }
                    tile.getComponent("Tile").setNum(newNum,false,false);
                    tile.setPosition(5+(5+tile.width)*col+tile.width/2,5+(5+tile.height)*row+tile.height/2);
                    this.tiles[row][col] = tile;
                    // this.scanAround(row,col,-1,-1,newNum,arr,scanArr);
                    if(arr.length<3){
                        break;
                    }
                }
                tile.getComponent("Tile").setArrPosition(row,col);
                this.tileBg.addChild(tile);
            }
        }*/
    },

     update (dt) {
         // this.myCheck()
     },
});
