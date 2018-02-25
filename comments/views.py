from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers
import psycopg2

def getPosts(request):
     if request.method == 'GET':
        print("here in getPosts")
        postsList = posts.objects.all();
        print(postsList)
        postsList = serializers.serialize("json", postsList)
        return HttpResponse(postsList, content_type="application/json")
