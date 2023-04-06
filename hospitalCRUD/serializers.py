from rest_framework import serializers
from hospitalCRUD.models import Patient,RendezVous,Doctor


#this classes are made to change the data in the db to a JSON format so they can be sent in 
# an API

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('PatientId','PatientName','PatientBirthDay','PatientIllness')


class RendezVousSerializer(serializers.ModelSerializer):
    class Meta:
        model = RendezVous
        fields = ('RdvId','RdvStartTime','RdvEndTime','patient','doctor')


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('DocId','DocName','DocLastName','DocSpec','patients')