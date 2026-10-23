resource "google_project_service" "pubsub_googleapis_com" {
  project = "737720691967"
  service = "pubsub.googleapis.com"
}
# terraform import google_project_service.pubsub_googleapis_com 737720691967/pubsub.googleapis.com
