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

//获取国内包裹列表接口
export const findByDistributorApi = (data) =>
  http.Axios.post("", {
    api: "api.DistributorPackage.findByDistributor",
    edatas: data,
  });

//作废国内包裹接口 即删除功能
export const cancelByDistributorApi = (data) =>
  http.Axios.post("", {
    api: "api.DistributorPackage.cancelByDistributor",
    edatas: data,
  });

//获取国家列表接口
export const getCountrysApi = () =>
  http.Axios.post("", {
    api: "api.InterShipping.getCountrys",
  });

///客户海外地址列表（UI上的地址管理）
export const findByDistributorAddressApi = (data) =>
  http.Axios.post("", {
    api: "api.DistributorInterAddress.findByDistributor",
    edatas: data,
  });

///客户海外地址 新增
export const addByDistributorAddressApi = (data) =>
  http.Axios.post("", {
    api: "api.DistributorInterAddress.addByDistributor",
    edatas: data,
  });
///客户海外地址 修改
export const changeByDistributorAddressApi = (data) =>
  http.Axios.post("", {
    api: "api.DistributorInterAddress.changeByDistributor",
    edatas: data,
  });

///客户海外地址 删除
export const deleteByDistributorAddressApi = (data) =>
  http.Axios.post("", {
    api: "api.DistributorInterAddress.deleteByDistributor",
    edatas: data,
  });

///客户海外地址 删除设为默认
export const setDefaultByDistributorApi = (data) =>
  http.Axios.post("", {
    api: "api.DistributorInterAddress.setDefaultByDistributor",
    edatas: data,
  });

///物流表
export const findByDistributorShipApi = (data) =>
  http.Axios.post("", {
    api: "api.InterShipping.findByDistributor",
    edatas: data,
  });

//确认转运
export const transportByDistributorApi = (data) =>
  http.Axios.post("", {
    api: "api.DistributorPackage.transportByDistributor",
    edatas: data,
  });

//海外转运包裹列表
export const findTransportByDistributorApi = (data) =>
  http.Axios.post("", {
    api: "api.DistributorPackage.findTransportByDistributor",
    edatas: data,
  });

//按转运包裹预估运费
export const forecastPackage = (data) =>
  http.Axios.post("", {
    api: "api.DistributorPackage.forecastPackage",
    edatas: data,
  });

//转运包裹详情
export const getTransportPackageDetail = (data) =>
  http.Axios.post("", {
    api: "api.DistributorPackage.getTransportPackageDetail",
    edatas: data,
  });

//运费估算
export const getShippingFeeByWeight = (data) =>
  http.Axios.post("", {
    api: "api.DistributorPackage.getShippingFeeByWeight",
    edatas: data,
  });
