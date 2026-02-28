---
name: propose-merge-filters
description: Proposes new merges for different kinds of filters based on the user's request. This helps the users of this webapp to effectively search for organizations.
---

# Propose Merge Filters

## Description

This skill is used to propose new merges for different kinds of filters based on the user's request. This helps the users of this webapp to effectively search for organizations. Basically edit the `api/filters/<filter-type>-filters.js`. This file has the hardcoded filters that should be split into other filters. This is done to split (specific/combined/incorrectly worded) fitlers into some generic filters to improve data quality and so that it is easy for users to filter organizations based on their preferences.

## Input

- `filter_type`: The type of filter to propose merges for. This can be one of the following:
  - `technologies`: The technologies filter.
  - `topics`: The topics filter.

## Output

- Modify `api/filters/<filter-type>-filters.js` based on the proposed merges.

## Approach

1. Run `node scripts/generate-raw-filters.js` to generate raw filters data.
2. Run `bun scripts/aggregate-single-filter-data.js --filter-type <filter-type> --analytics-dir <analytics-dir>` to aggregate analytics data. Here filter-type is the filter type you received from the user as input. analytics-dir is the full path for directory "../gsoc-organizations-store/analytics/data/quarterly".
3. Now look at the file `scripts/<filter-type>-data.json` to see the aggregated data. It is sorted by the historical user view count and the number of orgs having that technology or topic.
4. Now based on the data and some common sense, edit the filters to make the app more useful to users. Feel free to propose, new filters (that don't exist) to be added to the app if that makes sense.
