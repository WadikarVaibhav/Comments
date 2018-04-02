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

def getComments(request):
     if request.method == 'GET':
        parentId = request.GET.get('parentId', None);
        postId = request.GET.get('postId', None);
        print('parent id: ');
        print(parentId);
        print('post id: ');
        print(postId);
        if parentId == '0':
            comments = Comments.objects.filter(post_id = postId).filter(parent_id__isnull=True).only('comment')
        else :
            comments = Comments.objects.filter(post_id = postId).filter(parent_id = parentId).only('comment')
        comments = serializers.serialize("json", comments)
        return HttpResponse(comments, content_type="application/json")
