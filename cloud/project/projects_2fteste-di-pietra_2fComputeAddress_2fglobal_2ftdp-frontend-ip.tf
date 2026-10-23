resource "google_compute_global_address" "tdp_frontend_ip" {
  address      = "8.232.118.203"
  address_type = "EXTERNAL"
  ip_version   = "IPV4"

  labels = {
    managed-by-cnrm = "true"
  }

  name    = "tdp-frontend-ip"
  project = "teste-di-pietra"
}
# terraform import google_compute_global_address.tdp_frontend_ip projects/teste-di-pietra/global/addresses/tdp-frontend-ip
