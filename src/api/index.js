import http from "@/config/http";

// 拼邮团管理 start
export const findGroupOrderApi = (data) =>
  http.Axios.post("/findGroupOrder", data); //查询拼邮团
// 拼邮团管理 end

//获取供应商仓库地址列表接口 start
export const findTbWarehouseApi = (data) =>
  http.Axios.post("/findTbWarehouse", data);

//转运提交预报订单
export const addPackageCustomApi = (data) =>
  http.Axios.post("/addPackageCustom", data);

//拼邮提交包裹
export const saveGroupDetailCustomApi = (data) =>
  http.Axios.post("/saveGroupDetailCustom", data);

//获取包裹列表
export const findPackageCustomApi = (data) =>
  http.Axios.post("/findPackageCustom", data);

//邮寄限制
export const findContrabandApi = (data) =>
  http.Axios.post("/findContraband", data);

//客户海外地址管理
export const findReceivePlusApi = (data) =>
  http.Axios.post("/findReceivePlus", data);
export const saveReceivePlusApi = (data) =>
  http.Axios.post("/saveReceivePlus", data);
export const updateReceivePlusApi = (data) =>
  http.Axios.post("/updateReceivePlus", data);
export const deleteReceivePlusApi = (data) =>
  http.Axios.post("/deleteReceivePlus", data);

//获取国家列表
export const findCountryApi = (data) =>
  http.Axios.post("/findCountryCode", data);
//根据国家查询物流渠道--
export const findLogisticsApi = (data) =>
  http.Axios.post("/findLogistics", data);

//删除预报单
export const updatePackageApi = (data) =>
  http.Axios.post("/updatePackage", data);

//确认转运提交
export const saveDeliverCustomApi = (data) =>
  http.Axios.post("/saveDeliverCustom", data);

//查询订单详情
export const findDeliverOrderDetailApi = (data) =>
  http.Axios.post("/findDeliverOrderDetail", data);
