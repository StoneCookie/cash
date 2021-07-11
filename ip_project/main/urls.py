from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('', views.index),
    path('about', views.about),

    # COMPANY
    path('company/', CompanyListView.as_view()),
    path('company/create/', CompanyCreateView.as_view()),
    path('company/detail/<int:pk>/', CompanyDetailView.as_view()),

    # ROlE
    path('role/', RoleListView.as_view()),
    path('role/create/', RoleCreateView.as_view()),
    path('role/detail/<int:pk>/', RoleDetailView.as_view()),

    # CATEGORY
    path('category/', CategoryListView.as_view()),
    path('category/create/', CategoryCreateView.as_view()),
    path('category/detail/<int:pk>/', CategoryDetailView.as_view()),

    # WORK
    path('work/', WorkListView.as_view()),
    path('work/create/', WorkCreateView.as_view()),
    path('work/detail/<int:pk>/', WorkDetailView.as_view()),

    # VACANCY
    path('vacancy/', VacancyListView.as_view()),
    path('vacancy/create/', VacancyCreateView.as_view()),
    path('vacancy/detail/<int:pk>/', VacancyDetailView.as_view()),

    # EVENT
    path('event/', EventListView.as_view()),
    path('event/create/', EventCreateView.as_view()),
    path('event/detail/<int:pk>/', EventDetailView.as_view()),

    # COURSE
    path('course/', CourseListView.as_view()),
    path('course/create/', CourseCreateView.as_view()),
    path('course/detail/<int:pk>/', CourseDetailView.as_view()),

    # NEWS
    path('news/', NewsListView.as_view()),
    path('news/create/', NewsCreateView.as_view()),
    path('news/detail/<int:pk>/', NewsDetailView.as_view()),

    # NOTE
    path('note/', NoteListView.as_view()),
    path('note/create/', NoteCreateView.as_view()),
    path('note/detail/<int:pk>/', NoteDetailView.as_view()),

    path('user/login', signin),
]
