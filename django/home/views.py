from django.shortcuts import render
from rest_framework.views import APIView
from .serializer import StudentSerializer
from .models import Students
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
import io


class StudentApi(APIView):
    def post(self,request):

        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.data)
            Students.objects.create(
                name = serializer.validated_data['name'],
                age = serializer.validated_data['age'],
                image = serializer.validated_data['image'],
            )

            print(serializer.data)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors)
    
    
    def get(self,request):
        stu = Students.objects.all()
        serializer = StudentSerializer(stu,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
       