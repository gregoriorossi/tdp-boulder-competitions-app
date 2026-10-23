resource "google_project_service" "storage_googleapis_com" {
  project = "737720691967"
  service = "storage.googleapis.com"
}
# terraform import google_project_service.storage_googleapis_com 737720691967/storage.googleapis.com
