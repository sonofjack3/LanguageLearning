- scaling up/down affects the RAM/cores used by your app
- scaling in/out affects the number of machine instances running your app
- deployment slots are only available in Standard/Premium pricing tiers
- Azure will soon support ability to share Windows/Linux apps in the same resource group
- an ASP defines the region, number of VM instances, size of those VM instances, and a pricing tiers
- "shared" are literally shared with other customers
- consumption tier only supports function apps currently; autoscales based on usage
- if an ASP is configured to run five VM instances, then all apps in the plan run on all five instances
- put apps in a separate plan when the app is 1) resource intensive, 2) you want to scale it independently, 3) the app needs resources in
a separate region
- whenever possible, use deployment slots! Swapping warms up the necessary worker instances, eliminating downtime
- "hybrid connections" allow you to control outbound IP addresses of an app service
