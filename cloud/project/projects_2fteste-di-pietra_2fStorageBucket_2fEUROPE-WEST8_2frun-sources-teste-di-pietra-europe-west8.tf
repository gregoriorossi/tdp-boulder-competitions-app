resource "google_storage_bucket" "run_sources_teste_di_pietra_europe_west8" {
  cors {
    method = ["GET"]
    origin = ["https://*.cloud.google.com", "https://*.corp.google.com", "https://*.corp.google.com:*", "https://*.cloud.google", "https://*.byoid.goog"]
  }

  force_destroy = false

  labels = {
    managed-by-cnrm = "true"
    used-by         = "cloudrun"
  }

  location                 = "EUROPE-WEST8"
  name                     = "run-sources-teste-di-pietra-europe-west8"
  project                  = "teste-di-pietra"
  public_access_prevention = "inherited"

  soft_delete_policy {
    retention_duration_seconds = 604800
  }

  storage_class               = "STANDARD"
  uniform_bucket_level_access = true
}
# terraform import google_storage_bucket.run_sources_teste_di_pietra_europe_west8 run-sources-teste-di-pietra-europe-west8
