from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from hospitalCRUD.models import Patient,RendezVous,Doctor
from hospitalCRUD.serializers import PatientSerializer,RendezVousSerializer,DoctorSerializer
# Create your views here.


@csrf_exempt
def patientAPI(request,id=0):
    if request.method =='GET':
        patients = Patient.objects.all()
        patients_serializer = PatientSerializer(patients,many=True)
        return JsonResponse(patients_serializer.data,safe=False)
    elif request.method =='POST':
        patient_data = JSONParser().parse(request)
        patients_serializer = PatientSerializer(data=patient_data)
        if patients_serializer.is_valid():
            patients_serializer.save()
            return JsonResponse("Patient Added Successfully",safe=False)
        return JsonResponse("Failed to Add Patient",safe=False)
    elif request.method == 'PUT':
        patient_data=JSONParser().parse(request)
        patient = Patient.objects.get(PatientId=patient_data['PatientId'])
        patients_serializer=PatientSerializer(patient,data=patient_data)
        if patients_serializer.is_valid():
            patients_serializer.save()
            return JsonResponse("Patient Updated Successfully",safe=False)
        return JsonResponse("Failed To Update the Patient")
    elif request.method=='DELETE':
        patient = Patient.objects.get(PatientId=id)
        patient.delete()
        return JsonResponse("Patient Deleted Successfully",safe=False)

    
@csrf_exempt
def rdvAPI(request,id=0):
    if request.method =='GET':
        rdvs = RendezVous.objects.all()
        rdvs_serializer = RendezVousSerializer(rdvs,many=True)
        return JsonResponse(rdvs_serializer.data,safe=False)
    elif request.method =='POST':
        rdv_data = JSONParser().parse(request)
        rdvs_serializer = RendezVousSerializer(data=rdv_data)
        if rdvs_serializer.is_valid():
            rdvs_serializer.save()
            return JsonResponse("Rendez Vous Added Successfully",safe=False)
        return JsonResponse("Failed to Add Rendez Vous",safe=False)
    elif request.method == 'PUT':
        rdv_data=JSONParser().parse(request)
        rdv = RendezVous.objects.get(RdvId=rdv_data['RdvId'])
        rdvs_serializer=RendezVousSerializer(rdv,data=rdv_data)
        if rdvs_serializer.is_valid():
            rdvs_serializer.save()
            return JsonResponse("Rendez Vous Updated Successfully",safe=False)
        return JsonResponse("Failed To Update the Rendez Vous")
    elif request.method=='DELETE':
        rdv = RendezVous.objects.get(RdvId=id)
        rdv.delete()
        return JsonResponse("Doctor Deleted Successfully",safe=False)

@csrf_exempt
def doctorAPI(request,id=0):
    if request.method =='GET':
        doctors = Doctor.objects.all()
        doctors_serializer = DoctorSerializer(doctors,many=True)
        return JsonResponse(doctors_serializer.data,safe=False)
    elif request.method =='POST':
        doctor_data = JSONParser().parse(request)
        doctors_serializer = DoctorSerializer(data=doctor_data)
        if doctors_serializer.is_valid():
            doctors_serializer.save()
            return JsonResponse("Doctor Added Successfully",safe=False)
        return JsonResponse("Failed to Add Doctor",safe=False)
    elif request.method == 'PUT':
        doctor_data=JSONParser().parse(request)
        doctor = Doctor.objects.get(DocId=doctor_data['DocId'])
        doctors_serializer=DoctorSerializer(doctor,data=doctor_data)
        if doctors_serializer.is_valid():
            doctors_serializer.save()
            return JsonResponse("Doctor Updated Successfully",safe=False)
        return JsonResponse("Failed To Update the Doctor")
    elif request.method=='DELETE':
        doctor = Doctor.objects.get(DocId=id)
        doctor.delete()
        return JsonResponse("Doctor Deleted Successfully",safe=False)
     
