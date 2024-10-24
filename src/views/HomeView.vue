<template>
  <!-- Hero Section -->
  <header class="bg-primary text-white text-center py-5">
    <div class="container">
      <h1>Welcome to Home Page</h1>
      <p class="lead">
        This is a simple hero unit, a simple jumbotron-style component for calling extra attention
        to featured content or information.
      </p>
      <a href="#" class="btn btn-light btn-lg">Learn More</a>
    </div>
  </header>

  <!-- Features Section -->
  <section class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 mb-4">
          <div class="card h-100">
            <img src="https://picsum.photos/400/300" class="card-img-top" alt="Feature 1" />
            <div class="card-body">
              <h5 class="card-title">Post Management</h5>
              <p class="card-text">
                Post Management refers to the process of creating, editing, organizing, and deleting
                posts or content, typically in a content management system (CMS) or application, to
                maintain an up-to-date and relevant collection of information.
              </p>
              <RouterLink class="btn btn-primary" :to="{ name: 'PostIndex' }">Posts</RouterLink>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mb-4">
          <div class="card h-100">
            <img src="https://picsum.photos/400/300" class="card-img-top" alt="Feature 2" />
            <div class="card-body">
              <h5 class="card-title">Student Management</h5>
              <p class="card-text">
                Student Management involves the systematic administration of student data, including
                enrollment, attendance, performance tracking, and communication, to enhance the
                educational experience.
              </p>
              <RouterLink class="btn btn-primary" :to="{ name: 'StudentIndex' }"
                >Students</RouterLink
              >
            </div>
          </div>
        </div>
        <div class="col-lg-4 mb-4">
          <div class="card h-100">
            <img src="https://picsum.photos/400/300" class="card-img-top" alt="Feature 3" />
            <div class="card-body">
              <h5 class="card-title">Login/Register</h5>
              <p class="card-text">
                Login/Register refers to the processes that allow users to securely create an
                account or access an existing one on a platform, enabling personalized experiences
                and data management through authentication and authorization mechanisms.
              </p>
              <RouterLink class="btn btn-primary" :to="{ name: 'login' }">Login</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
