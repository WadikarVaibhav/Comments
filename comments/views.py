from rest_framework import generics
from .models import Posts, Users, Comments
from django.http import HttpResponse

def getPosts(Request):
    return HttpResponse("Hello from django to react")
