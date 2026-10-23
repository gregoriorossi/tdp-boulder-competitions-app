resource "google_service_account" "737720691967_compute" {
  account_id   = "737720691967-compute"
  display_name = "Compute Engine default service account"
  project      = "teste-di-pietra"
}
# terraform import google_service_account.737720691967_compute projects/teste-di-pietra/serviceAccounts/737720691967-compute@teste-di-pietra.iam.gserviceaccount.com
