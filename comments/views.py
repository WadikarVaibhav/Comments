from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers
import psycopg2
from .models import Posts, Users, Comments

def getPosts(request):
     if request.method == 'GET':
        postsList = Posts.objects.all();
        postsList = serializers.serialize("json", postsList)
        return HttpResponse(postsList, content_type="application/json")

def getParentComments(request):
     if request.method == 'GET':
        parentId = request.GET.get('parentId', None);
        postId = request.GET.get('postId', None);
        print(parentId);
        print(postId);
        parentComments = Comments.objects.filter(post_id = postId).filter(parent_id__isnull=True).only('comment')
        parentComments = serializers.serialize("json", parentComments)
        return HttpResponse(parentComments, content_type="application/json")
