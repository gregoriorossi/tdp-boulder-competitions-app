resource "google_project_service" "datastore_googleapis_com" {
  project = "737720691967"
  service = "datastore.googleapis.com"
}
# terraform import google_project_service.datastore_googleapis_com 737720691967/datastore.googleapis.com
