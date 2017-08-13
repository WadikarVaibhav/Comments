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

def getParentComments(request):
    if request.method == 'GET':
        postId = request.GET.get('postId', None);
        comments = Comments.objects.filter(post_id = postId).filter(parent_id = None)
        comments = serializers.serialize("json", comments)
        print(comments)
    return HttpResponse(comments, content_type="application/json")
