import type { TravelRoute } from './TravelRoute';

export interface FormData {
  router_index: number;
  notes: string;
  requested_fee: number | string;
  imposed_fee: number | string;
  origin_country_name: string;
  origin_city_name: string;
  destination_country_name: string;
  destination_city_name: string;
  beginning_date: string;
  beginning_time: string;
  ending_date: string;
  ending_time: string;
  plane_needed: boolean;
  hotel_needed: boolean;
  routes: TravelRoute[];
}