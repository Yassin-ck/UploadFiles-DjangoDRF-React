from rest_framework import serializers
from .models import Students

class StudentSerializer(serializers.ModelSerializer):
    image = serializers.FileField(required=False)
    name = serializers.CharField(max_length=100)
    class Meta:
        model = Students 
        fields = ['name','age','image']
        