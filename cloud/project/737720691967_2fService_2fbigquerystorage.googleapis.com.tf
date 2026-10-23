resource "google_project_service" "bigquerystorage_googleapis_com" {
  project = "737720691967"
  service = "bigquerystorage.googleapis.com"
}
# terraform import google_project_service.bigquerystorage_googleapis_com 737720691967/bigquerystorage.googleapis.com
