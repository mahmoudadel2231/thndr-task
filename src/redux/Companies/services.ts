import axios from 'axios';

type TFetchCompaniesParams = {
  params: {limit?: number; search?: string};
  nextURL: string;
  search: string;
};

const fetchCompaniesList = (params: TFetchCompaniesParams) => {
  return axios.get(
    `/v3/reference/tickers?active=true&search=${params?.search || ''}`,
  );
};

const fetchCompaniesPaginationList = (params: TFetchCompaniesParams) => {
  return axios.get(params?.nextURL, {});
};

const CompaniesAPI = {
  fetchCompaniesList,
  fetchCompaniesPaginationList,
};

export default CompaniesAPI;
