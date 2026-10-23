resource "google_compute_global_address" "default_ip_range_1786284547461" {
  address      = "10.65.0.0"
  address_type = "INTERNAL"

  labels = {
    managed-by-cnrm = "true"
  }

  name          = "default-ip-range-1786284547461"
  network       = "https://www.googleapis.com/compute/v1/projects/teste-di-pietra/global/networks/default"
  prefix_length = 20
  project       = "teste-di-pietra"
  purpose       = "VPC_PEERING"
}
# terraform import google_compute_global_address.default_ip_range_1786284547461 projects/teste-di-pietra/global/addresses/default-ip-range-1786284547461
