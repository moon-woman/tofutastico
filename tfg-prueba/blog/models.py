from django.db import models
from django.utils import timezone
from django.conf import settings

# tabla en bbdd que va a almacenar todos los datos

# post estarán asociados a users, por eso importamos el User module

# vamos a ponerle fecha tb

# el segundo componente es para que si borro una categoría, no se borren todos los posts asociados a esa categoría

# el primero es para crear la categoría del post

class Category(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name


class Post (models.Model):
    
    # para mostrar solo los datos que tengan el estado de publicado
    
    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status = 'published')
    
    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, default=1)
    title = models.CharField(max_length=250)
    excerpt = models.TextField(null=True)
    ingredients = models.TextField(blank=True, null=True)
    content = models.TextField()
    slug = models.SlugField(max_length=250, unique_for_date='published')
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='blog_posts')
    status = models.CharField(
        max_length=10, choices=options, default='published')
    photo = models.ImageField(upload_to='photos', null=True, blank=True)
    objects = models.Manager() # default manager
    postobjects = PostObjects() #custom manager
    
    # para mostrar los datos de manera descendente o ascendente
    
    class Meta:
        ordering = ('-published',)
        
    def __str__(self):
        return self.title