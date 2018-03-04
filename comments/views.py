from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers
import psycopg2
from .models import Posts, Users, Comments

def getPosts(request):
     if request.method == 'GET':
        print('here the request type: '+request.method)
        postsList = Posts.objects.all();
        print(postsList)
        postsList = serializers.serialize("json", postsList)
        return HttpResponse(postsList, content_type="application/json")
