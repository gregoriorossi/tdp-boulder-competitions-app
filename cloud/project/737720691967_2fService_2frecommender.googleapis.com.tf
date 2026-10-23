resource "google_project_service" "recommender_googleapis_com" {
  project = "737720691967"
  service = "recommender.googleapis.com"
}
# terraform import google_project_service.recommender_googleapis_com 737720691967/recommender.googleapis.com
