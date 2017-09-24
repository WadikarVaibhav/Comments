from rest_framework import generics
from .models import posts, users, comments
from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers

def getPosts(request):
    if request.method == 'GET':
        print("here")
        postsList = posts.objects.all();
        postsList = serializers.serialize("json", postsList)
    return HttpResponse(postsList, content_type="application/json")

def getParentComments(request):
    if request.method == 'GET':
        postId = request.GET.get('postId', None);
        commentsList = comments.objects.filter(post_id = postId).filter(parent_id = None)
        commentsList = serializers.serialize("json", commentsList)
        print(commentsList)
    return HttpResponse(commentsList, content_type="application/json")

def getChildComments(request):
    if request.method == 'GET':
        parentId = request.GET.get('parentId', None);
        commentsList = comments.objects.filter(parent_id = parentId)
        commentsList = serializers.serialize("json", commentsList)
        print(commentsList)
    return HttpResponse(commentsList, content_type="application/json")
