import {
  DONG_JIA_HAO,
  FU_JING_XI,
  WEI_YING,
  YAO_HONG_BO,
  YUAN_SI_YU,
  RUAN_JIAN_JI_SHU_XI,
  WANG_DE_ZHEN,
  LIU_XIAO_JUN,
  GUO_JUN,
  SHI_HANG_WEI,
  DUAN_XIAO_YU,
  WANG_PENG_PENG,
  WANG_YAN_HUI,
  WANG_KANG,
  XIN_XING_TAO,
  LI_XU_YANG,
  ZHANG_JING_DI,
  WANG_LEI,
  WU_YAO_TIAN,
  LI_LI_XIANG,
  MA_XIANG,
  LI_TIAN_SHAN,
  LIU_HONG_WU,
  CAI_FEI,
  SHI_JIAN_GUO,
  ZHANG_YAN_MIN,
  HAN_SHUN,
  ZHAO_JUN,
  XUE_SI_NUO,
  HOU_KE,
  YUAN_SHI_CHAO,
  ZHANG_LI_BIN,
  SUI_HAI_JIANG,
  WANG_JUN_GANG,
  ZHANG_JIA_JIA,
  MA_XIAO_LONG,
  LI_JING_MEI
} from './filterName.js';
const pInfo = [DONG_JIA_HAO, FU_JING_XI, WEI_YING,
  YAO_HONG_BO, YUAN_SI_YU, RUAN_JIAN_JI_SHU_XI,
  WANG_DE_ZHEN, LIU_XIAO_JUN, GUO_JUN, SHI_HANG_WEI,
  DUAN_XIAO_YU, WANG_PENG_PENG, WANG_YAN_HUI,
  WANG_KANG, XIN_XING_TAO, LI_XU_YANG, ZHANG_JING_DI, WANG_LEI, WU_YAO_TIAN, LI_LI_XIANG, MA_XIANG,
  LI_TIAN_SHAN,LIU_HONG_WU,CAI_FEI,SHI_JIAN_GUO,ZHANG_YAN_MIN,HAN_SHUN,ZHAO_JUN
  ,XUE_SI_NUO,HOU_KE,YUAN_SHI_CHAO,ZHANG_LI_BIN,SUI_HAI_JIANG,WANG_JUN_GANG
  ,ZHANG_JIA_JIA,MA_XIAO_LONG,LI_JING_MEI
];
//元素是否在数组中API
Array.prototype.isInArray = function (str) {
  let i = this.length;
  while (i--) {
    if (this[i] == str) {
      return true;
    }
  }
  return false;
}
//得到时间
export const toDateA = (date) => {
  return date.getFullYear() + " / " + (date.getMonth() + 1) + " / " + date.getDate();
}
//得到未交人的信息结构
export const getUnGiveDetailInfo = (classd, givel) => {
  var arr = [];
  // classd.forEach((item)=>{
  //   if(item.name=="李京美"){
  //     alert(item.userid);
  //   }

  // })
  if (givel.length != 0) {
    let b = [];   //存储姓名
    givel.forEach((item)=>{
      b.push(item.creator_name);
    });
      classd.forEach((item)=>{
        if(!b.isInArray(item.name)){    //判断姓名是不是在已有的里面
          if (!pInfo.isInArray(item.userid)) {    //排除白名单
            arr.push(item);
          }
        }
      })
    return arr;
  } else {
    classd.forEach((item) => {
      if (!pInfo.isInArray(item.userid)) {
        arr.push(item);
      }
    });
    return arr;
  }
}
//处理已交信息结构(加入头像)
export const disposeGiveLogData = (classd, givel) => {
  givel.forEach((item) => {
    classd.forEach((value) => {
      if (item.creator_name === value.name) {
        item.avatar = value.avatar;
      }
    })
  });
  return givel;
}
