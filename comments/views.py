from rest_framework import generics
from .models import Posts, Users, Comments
from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers

def getPosts(request):
    if request.method == 'GET':
        posts = Posts.objects.all();
        posts = serializers.serialize("json", posts)
    return HttpResponse(posts, content_type="application/json")
