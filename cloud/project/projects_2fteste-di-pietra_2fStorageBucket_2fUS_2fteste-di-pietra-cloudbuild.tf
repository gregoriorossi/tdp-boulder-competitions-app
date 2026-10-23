resource "google_storage_bucket" "teste_di_pietra_cloudbuild" {
  force_destroy = false

  labels = {
    managed-by-cnrm = "true"
  }

  location                 = "US"
  name                     = "teste-di-pietra_cloudbuild"
  project                  = "teste-di-pietra"
  public_access_prevention = "inherited"

  soft_delete_policy {
    retention_duration_seconds = 604800
  }

  storage_class               = "STANDARD"
  uniform_bucket_level_access = true
}
# terraform import google_storage_bucket.teste_di_pietra_cloudbuild teste-di-pietra_cloudbuild
