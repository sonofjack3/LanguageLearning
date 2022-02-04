- Virtual machines can be used for development, testing, hosting apps in the cloud, and acting as extended datacenters
- When choosing a VM, keep in mind the size, limitations (currently 20 VMs per region, per subscription), OS image, disks (standard = HDD, premium = SSD), and disk storage (managed vs unmanaged, wherein the storage is associated with a storage account you configure)
- Windows VMs in Azure have extensions such as the ability to run custom scripts, manage configurations/environments and collect diagnostics data
- VMs can be logically grouped into "availability sets" to provide redundancy/availability. An availability set is composed for two groupings: 
    - **Fault domains** distribute VMs across physical hardware to limit the impact of hardware failure
    - **Update domains** ensure that VMs across zones are not updated at the same time
- Availability sets can also be combined with an Azure Load Balancer for maximium resiliency 
- VM sizes include:
    - **General purpose** - balanced CPU-to-memory ratio; ideal for testing/development
    - **Computer optimized** - High CPU-to-memory ratio; good for medium traffic web servers, batch processes, etc.
    - **Memory optimized** - High memory-to-CPU ratio; good for relational DBs, caches, analytics
    - **Storage optimized** - High disk throughput and IO ideal for Big Data, SQL/NoSQL DBs, data warehousing, etc.
    - **GPU** - ideal for heavy graphic rendering and machine/deep learning
    - **High Performance Compute** - Most powerful CPU VMs