from django.db import models
from datetime import datetime

class Users(models.Model):
    user_id = models.AutoField(primary_key = True)
    user_name = models.CharField(max_length = 20, null =False, blank=False, default='')
    firstname = models.CharField(max_length = 20, null =False, blank=False, default='')
    lastname = models.CharField(max_length = 20, null =False, blank=False, default='')
    password = models.CharField(max_length = 20, null =False, blank=False, default='')
    emailId = models.CharField(max_length = 30, null =False, blank=False, default='')
    picture = models.FileField(blank=True, null=True)

    def __str__(self):
        return self.user_name + ' ' +str(self.user_id)

class Posts(models.Model):
    post_id = models.AutoField(primary_key = True)
    post = models.FileField(blank=True, null=True)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    date_created = models.DateTimeField( editable=False, default=datetime.now())

class Comments(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    comment_id = models.AutoField(primary_key = True)
    comment = models.CharField(max_length = 500)
    post_id = models.ForeignKey(Posts, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True, editable=False)
    date_modified = models.DateTimeField(auto_now=True)
    parent_id = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null =True)
    likes = models.IntegerField(default=0)
    userFullName = models.CharField(max_length = 20, default='Vaibhav Wadikar')
    profile = models.FileField(blank=True, null = True)

    def __str__(self):
        return str(self.user_id) + '. '+str(self.comment_id) + '. '+self.comment +'--> parent id: '+str(self.parent_id)
