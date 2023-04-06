from django.urls import re_path
from hospitalCRUD import views


urlpatterns = [
    #patient urls
    re_path(r'^patient$',views.patientAPI),
    re_path(r'^patient/([0-9]+)$',views.patientAPI),
    #rdv urls
    re_path(r'^rdv$',views.rdvAPI),
    re_path(r'^rdv/([0-9]+)$',views.rdvAPI),
    #doctor urls 
    re_path(r'^doctor$',views.doctorAPI),
    re_path(r'^doctor/([0-9]+)$',views.doctorAPI)
]

