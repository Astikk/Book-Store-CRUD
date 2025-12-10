from django.db import models

# in db django store the name as => appName + modelName
class Book(models.Model):
    
    # When you want to give custom name to the model
    # class Meta:
    #     db_table = "my_custom_table_name"

    title = models.CharField(max_length=50)
    release_year = models.IntegerField()

# how the class will be represented
    def __str__(self):
        return self.title