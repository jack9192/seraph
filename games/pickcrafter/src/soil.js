var soilData=function(t,i,e){this.textureName="assets/soil_0"+(t+1).toString()+".png",this.type=t,this.strength=i,this.rubiesChance=e},setSoil=[new soilData(0,10,[25,15,5,0,0]),new soilData(1,15,[30,20,10,5,0]),new soilData(2,20,[35,25,15,10,5]),new soilData(3,30,[40,30,20,15,10]),new soilData(4,40,[45,35,25,20,15]),new soilData(5,50,[50,40,30,25,20]),new soilData(6,60,[55,45,35,30,25]),new soilData(7,80,[60,50,40,35,30]),new soilData(8,100,[65,55,45,40,35])],Soil=function(t,i){this.type=0,this.data=setSoil[0],this.strength=this.data.strength,this.damageTextureNames=[res.soil_damage_1,res.soil_damage_2,res.soil_damage_3,res.soil_damage_4,res.soil_damage_5],this.prevDamageTextureIdx=-1,this.spriteSoil=new cc.Sprite(this.data.textureName),this.spriteSoil.anchorX=0,this.spriteSoil.anchorY=0,this.spriteDamage=new cc.Sprite(this.damageTextureNames[0]),this.spriteDamage.setPosition(.5*cc.winSize.width,.5*cc.winSize.height+50),this.spriteDamage.setVisible(!1),t.addChild(this.spriteSoil),t.addChild(this.spriteDamage),this.onDestroy=i,this.context=t};Soil.prototype={setDamage:function(t){if(audioAllowed&&cc.audioEngine.playEffect(sfx_soil[this.data.type]),this.strength-=t,this.strength>0){var i=this.strength/this.data.strength,e=Math.floor(this.damageTextureNames.length-5*i)-1;e!=this.prevDamageTextureIdx&&(this.spriteDamage.setTexture(this.damageTextureNames[e]),this.spriteDamage.setVisible(!0),audioAllowed&&cc.audioEngine.playEffect(sfx_crack[e]),this.prevDamageTextureIdx=e)}else this.onDestroy.call(this.context,this.data.type),this.getNextSoil()},getNextSoil:function(){++this.type==playerData.soilsAllowed&&(this.type=0),this.data=setSoil[this.type],this.strength=this.data.strength,this.spriteSoil.setTexture(this.data.textureName),this.spriteDamage.setVisible(!1),this.prevDamageTextureIdx=-1}};var BoxSoil=function(t){this.exists=!1,this.velocity=cc.p(),this.gravity=1500,this.sprite=new cc.Sprite("#box_soil_01"),this.sprite.setScale(2),this.sprite.setVisible(this.exists),t.addChild(this.sprite)};BoxSoil.prototype={boom:function(t){var i=.5*cc.winSize.width,e=.5*cc.winSize.height;this.sprite.setSpriteFrame(t),this.sprite.x=rnd.realInRange(i-50,i+50),this.sprite.y=rnd.realInRange(e-50,e+50),this.velocity.x=rnd.realInRange(100,200),this.velocity.y=rnd.realInRange(700,1e3),this.sprite.x<i&&(this.velocity.x=-this.velocity.x),this.sprite.setVisible(this.exists=!0)},boom2:function(t,i,e){this.sprite.setSpriteFrame(t),this.sprite.x=rnd.realInRange(i-15,i+15),this.sprite.y=rnd.realInRange(e-5,e+5),this.velocity.x=rnd.realInRange(50,100),this.velocity.y=rnd.realInRange(350,500),this.sprite.x<i&&(this.velocity.x=-this.velocity.x),this.sprite.setVisible(this.exists=!0)},update:function(t){this.velocity.y-=this.gravity*t,this.sprite.x+=this.velocity.x*t,this.sprite.y+=this.velocity.y*t,(this.sprite.y<-100||this.sprite.x<-100||this.sprite.x>cc.winSize.width+100)&&this.sprite.setVisible(this.exists=!1)}};var BoxSoilsGroup=function(t,i){this.boxes=[];for(var e=0;e<t;e++)this.boxes.push(new BoxSoil(i))};BoxSoilsGroup.prototype={boom:function(t,i){var e=0,s="box_soil_0"+(i+1).toString();for(var a in this.boxes)if(!this.boxes[a].exists&&(this.boxes[a].boom(s),++e>=t))break},boomRubies:function(t){for(var i=0,e=0,s="",a=0;a<t.length;++a)if(t[a])for(s="rubies_"+a.toString(),e=0;e<t[a];){for(;this.boxes[i].exists;)if(++i>=this.boxes.length)return;this.boxes[i].boom(s),++e}},boom2:function(t,i,e){for(var s in t){if(s>=this.boxes.length)break;this.boxes[s].boom2(t[s],i,e)}},update:function(t){for(var i in this.boxes)this.boxes[i].exists&&this.boxes[i].update(t)},update2:function(t){var i=!0;for(var e in this.boxes)this.boxes[e].exists&&(this.boxes[e].update(t),i=!1);return i},prepareForChest:function(){for(var t in this.boxes)this.boxes[t].sprite.setScale(.9),this.boxes[t].gravity=900}};var FlyDamage=function(t){this.exists=!1,this.label=new cc.LabelTTF("","Press Start 2P",40),this.label.enableStroke(cc.color(0,0,0),4),this.label.setVisible(!1),t.addChild(this.label)};FlyDamage.prototype={go:function(){var t=.5*cc.winSize.width,i=.5*cc.winSize.height;this.label.x=rnd.realInRange(t-200,t+200),this.label.y=rnd.realInRange(i-200,i+200),this.label.opacity=255,this.label.setVisible(!0),this.exists=!0},update:function(t){this.label.y+=200*t,this.label.opacity-=200*t,this.label.opacity<=0&&(this.label.setVisible(!1),this.exists=!1)}};var FlyDamageGroup=function(t,i){this.objs=[];for(var e=0;e<t;e++)this.objs.push(new FlyDamage(i))};FlyDamageGroup.prototype={setValue:function(t,i){i&&(t+=t);var e="+"+t.toString();for(var s in this.objs)this.objs[s].label.setString(e)},go:function(){for(var t in this.objs)if(!this.objs[t].exists){this.objs[t].go();break}},update:function(t){for(var i in this.objs)this.objs[i].exists&&this.objs[i].update(t)}};