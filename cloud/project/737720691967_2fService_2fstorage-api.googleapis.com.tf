resource "google_project_service" "storage_api_googleapis_com" {
  project = "737720691967"
  service = "storage-api.googleapis.com"
}
# terraform import google_project_service.storage_api_googleapis_com 737720691967/storage-api.googleapis.com
