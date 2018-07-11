with rev_month as (
select round(sum(ad_exchange_line_item_level_revenue)/1000000, 2) as monthly_rev
     , to_char(date::date, 'YYYY-MM') as month
     , european_union
     , 'AdX' as demand_source 
  from hold_adx_geo
  join z_eu_nation
    on country_name = country
 group by month, european_union
union all
select round(sum(revenue), 2) as monthly_rev
     , to_char(date::date, 'YYYY-MM') as month
     , european_union 
     , 'Rubicon'
  from hold_rubicon_alpha_country r
  join z_eu_nation z
    on r.country = z.country
 group by month, european_union
 union all
 select round(sum(revenue), 2) as monthly_rev
     , to_char(date::date, 'YYYY-MM') as month
     , european_union 
     , 'OpenX'
  from hold_openx_exch_perf r
  join z_eu_nation z
    on initcap(r.country) = z.country
 group by month, european_union
)
select distinct month 
     , sum(monthly_rev) over me as monthly_rev
     , round((sum(monthly_rev) over me / sum(monthly_rev) over m) * 100, 1) as share
     , european_union
  from rev_month
window m as (partition by month)
     , me as (partition by month, european_union)
 order by month asc, monthly_rev desc
;