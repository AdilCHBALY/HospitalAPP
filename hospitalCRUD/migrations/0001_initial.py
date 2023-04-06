# Generated by Django 4.0.6 on 2023-04-05 20:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('DocId', models.AutoField(primary_key=True, serialize=False)),
                ('DocName', models.CharField(max_length=100)),
                ('DocLastName', models.CharField(max_length=100)),
                ('DocSpec', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('PatientId', models.AutoField(primary_key=True, serialize=False)),
                ('PatientName', models.CharField(max_length=100)),
                ('PatientBirthDay', models.DateField()),
                ('PatientIllness', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='RendezVous',
            fields=[
                ('RdvId', models.AutoField(primary_key=True, serialize=False)),
                ('RdvStartTime', models.TimeField()),
                ('RdvEndTime', models.TimeField()),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hospitalCRUD.doctor')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hospitalCRUD.patient')),
            ],
        ),
        migrations.AddField(
            model_name='doctor',
            name='patients',
            field=models.ManyToManyField(to='hospitalCRUD.patient'),
        ),
    ]
