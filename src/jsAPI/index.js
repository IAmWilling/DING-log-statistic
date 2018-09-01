import {DONG_JIA_HAO,FU_JING_XI,WEI_YING,
  YAO_HONG_BO,YUAN_SI_YU,RUAN_JIAN_JI_SHU_XI,
  WANG_DE_ZHEN,LIU_XIAO_JUN,GUO_JUN,SHI_HANG_WEI,
  DUAN_XIAO_YU,WANG_PENG_PENG,WANG_YAN_HUI,
  WANG_KANG,XIN_XING_TAO,LI_XU_YANG,ZHANG_JING_DI,WANG_LEI
  ,WU_YAO_TIAN,LI_LI_XIANG,MA_XIANG
} from './filterName.js';
const pInfo = [DONG_JIA_HAO,FU_JING_XI,WEI_YING,
  YAO_HONG_BO,YUAN_SI_YU,RUAN_JIAN_JI_SHU_XI,
  WANG_DE_ZHEN,LIU_XIAO_JUN,GUO_JUN,SHI_HANG_WEI,
  DUAN_XIAO_YU,WANG_PENG_PENG,WANG_YAN_HUI,
  WANG_KANG,XIN_XING_TAO,LI_XU_YANG,ZHANG_JING_DI,WANG_LEI
  ,WU_YAO_TIAN,LI_LI_XIANG,MA_XIANG];
//元素是否在数组中API
Array.prototype.isInArray = function (str) {
  let i = this.length;
  while(i--) {
    if(this[i]==str){
      return true;
    }
  }
  return false;
}
//得到时间
export const toDateA = (date)=>{
  return date.getFullYear() + " / " + (date.getMonth() + 1) + " / " + date.getDate();
}
//得到未交人的信息结构
export const getUnGiveDetailInfo = (classd,givel) => {
  var arr = new Array();
  // classd.forEach(item=>{
 
  //   if(item.name=="李理想"){
  //     alert(item.userid);
  //   }
  // })
  if(givel.length!=0){
   
    classd.forEach((item)=>{
      givel.forEach((value)=>{
        if(item.name != value.creator_name) {
          if(!pInfo.isInArray(item.userid)){
            arr.push(item);
          }
        }
      })
    });
    return arr;
  }else{

    classd.forEach((item)=>{
      
      if(!pInfo.isInArray(item.userid)){
        arr.push(item);
      }
    });
    return arr;
  }

  
}
//处理已交信息结构(加入头像)
export const  disposeGiveLogData = (classd,givel) =>{
  givel.forEach((item)=>{
    classd.forEach((value)=>{
      if(item.creator_name===value.name) {
        item.avatar = value.avatar;
      }
    })
  });
  return givel;
}
