export interface AdditionalRoute {
  router_index: number;
  origin_country_name: string;
  origin_city_name: string;
  destination_country_name: string;
  destination_city_name: string;
  beginning_date?: string;
  beginning_time?: string;
  ending_date?: string;
  ending_time?: string;
  plane_needed?: boolean;
  hotel_needed?: boolean;
}