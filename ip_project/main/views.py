from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
import jwt


@api_view(['POST'])
def signin(request):
    username = list(request.data.values())[0]
    password = list(request.data.values())[1]

    usr = Users.objects.filter(login=username).exists()
    if usr:
        dictionary = Users.objects.filter(login=username).values()[0]
        if usr and dictionary["password"] == password:
            fio = dictionary["fio"]
            mail = dictionary["mail"]
            login = dictionary["login"]
            id = dictionary["id"]
            role = Users.objects.get(login=username).get_role()
            encoded_jwt = jwt.encode({'fio': fio, 'mail': mail, 'login': login, 'role': role, 'id': id}, 'secret',
                                     algorithm='HS256')
            return Response({'token': encoded_jwt})
        else:
            return Response({'No Match'})
    return Response({'No Match'})


def index(request):
    return render(request, 'main/index.html')


def about(request):
    return render(request, 'main/about.html')


# COMPANY
class CompanyListView(generics.ListAPIView):
    serializer_class = CompanyListSerializer
    queryset = Company.objects.all()


class CompanyCreateView(generics.CreateAPIView):
    serializer_class = CompanySerializer


class CompanyDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()


# ROLE
class RoleListView(generics.ListAPIView):
    serializer_class = RoleListSerializer
    queryset = Role.objects.all()


class RoleCreateView(generics.CreateAPIView):
    serializer_class = RoleSerializer


class RoleDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RoleSerializer
    queryset = Role.objects.all()


# CATEGORY
class CategoryListView(generics.ListAPIView):
    serializer_class = CategoryListSerializer
    queryset = Category.objects.all()


class CategoryCreateView(generics.CreateAPIView):
    serializer_class = CategorySerializer


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


# WORK
class WorkListView(generics.ListAPIView):
    serializer_class = WorkListSerializer
    queryset = Work.objects.all()


class WorkCreateView(generics.CreateAPIView):
    serializer_class = WorkSerializer


class WorkDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WorkSerializer
    queryset = Work.objects.all()


# VACANCY
class VacancyListView(generics.ListAPIView):
    serializer_class = VacancyListSerializer
    queryset = Vacancy.objects.all()


class VacancyCreateView(generics.CreateAPIView):
    serializer_class = VacancySerializer


class VacancyDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = VacancySerializer
    queryset = Vacancy.objects.all()


# EVENT
class EventListView(generics.ListAPIView):
    serializer_class = EventListSerializer
    queryset = Event.objects.all()


class EventCreateView(generics.CreateAPIView):
    serializer_class = EventSerializer


class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EventSerializer
    queryset = Event.objects.all()


# COURSE
class CourseListView(generics.ListAPIView):
    serializer_class = CourseListSerializer
    queryset = Course.objects.all()


class CourseCreateView(generics.CreateAPIView):
    serializer_class = CourseSerializer


class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()


# NEWS
class NewsListView(generics.ListAPIView):
    serializer_class = NewsListSerializer
    queryset = News.objects.all()


class NewsCreateView(generics.CreateAPIView):
    serializer_class = NewsSerializer


class NewsDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NewsSerializer
    queryset = News.objects.all()


# NOTE
class NoteListView(generics.ListAPIView):
    serializer_class = NoteListSerializer
    queryset = Note.objects.all()


class NoteCreateView(generics.CreateAPIView):
    serializer_class = NoteSerializer


class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    queryset = Note.objects.all()
