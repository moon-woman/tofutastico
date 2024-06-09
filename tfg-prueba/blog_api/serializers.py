from rest_framework import serializers
from blog.models import Category, Post
from usuarios.models import NewUser

class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = ('id', 'name')

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = NewUser
        fields = ('id_usuario', 'alias_usuario', 'foto_usuario', 'email', 'nombre', 'apellido_primero', 'apellido_segundo', 'fecha_nacimiento', 'descripcion')
        
class UserPatchSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = NewUser
        fields = ('id_usuario', 'nombre', 'apellido_primero', 'apellido_segundo', 'fecha_nacimiento', 'descripcion')

class PostSerializer(serializers.ModelSerializer):
    category = CategorySerializer(required=False)
    author = UserSerializer(required=False , read_only=True)
    slug = serializers.CharField(required=False)
    class Meta:
        model = Post
        fields = ('id', 'title', 'slug', 'author', 'excerpt', 'content', 'ingredients', 'status', 'photo', 'category', 'published')
        
        
class PostCreate(serializers.ModelSerializer):
    author = UserSerializer(required=False , read_only=True)
    slug = serializers.CharField(required=False)
    class Meta:
        model = Post
        fields = ('id', 'title', 'slug', 'author', 'excerpt', 'content', 'ingredients', 'status', 'photo', 'category', 'published')



    
