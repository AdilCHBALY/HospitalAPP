from django.db import models

# Create your models here.


class Patient(models.Model):
    PatientId = models.AutoField(primary_key=True)
    PatientName = models.CharField(max_length=100)
    PatientBirthDay = models.DateField()
    PatientIllness = models.CharField(max_length=150)

class Doctor(models.Model):
    DocId = models.AutoField(primary_key=True)
    DocName = models.CharField(max_length=100)
    DocLastName = models.CharField(max_length=100)
    DocSpec = models.CharField(max_length=100)
    patients = models.ManyToManyField(Patient)


class RendezVous(models.Model):
    RdvId=models.AutoField(primary_key=True)
    RdvStartTime = models.TimeField()
    RdvEndTime = models.TimeField()
    patient = models.ForeignKey(Patient,on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor,on_delete=models.CASCADE)